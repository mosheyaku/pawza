import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { decidePotentialMatch, getPotentialMatch } from '../../api/potential-matches';
import { useAuth } from '../Auth/useAuth';
import FullScreenLoader from '../Loader/FullScreenLoader';
import TinderCard from '../TinderCard';
import ImageCard from './ImageCard';
import PawButton from './PawButton';

interface SuggestedUser {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
  addressed: boolean;
}

function Home() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [isSwiping, setIsSwiping] = useState(false);
  const topCard = useRef<any>(null);
  const [resetCard, setResetCard] = useState(1);
  const [openSuperLikedDialog, setOpenSuperLikedDialog] = useState(false);
  const [superLikeChatId, setSuperLikeChatId] = useState('');
  const unaddressedSuggestionsCount = useMemo(() => suggestions.filter((x) => !x.addressed).length, [suggestions]);

  const { user } = useAuth();

  const {
    data: potentialMatches,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getPotentialMatch(suggestions.map((x) => x.id)),
  });

  const { mutateAsync: callDecidePotentialMatch } = useMutation({
    mutationFn: (data: Parameters<typeof decidePotentialMatch>[0]) => decidePotentialMatch(data),
    onSuccess: (res) => setSuperLikeChatId(res.data.chatId),
  });

  useEffect(() => {
    if (!potentialMatches) return;

    setSuggestions((p) => [
      ...p.filter((suggestion) => !suggestion.addressed),
      ...potentialMatches
        .filter((newSuggestion: any) => !p.find((existingSuggestion) => existingSuggestion.id === newSuggestion.id))
        .map((x: any) => ({ ...x, addressed: false })),
    ]);
  }, [potentialMatches]);

  const swipe = async (dir: 'left' | 'right', isSuper = false) => {
    if (topCard.current) {
      let decision: 'accept' | 'decline' | 'super';
      if (dir === 'left') {
        decision = 'decline';
      } else if (isSuper) {
        decision = 'super';
      } else {
        decision = 'accept';
      }
      suggested.addressed = true;
      callDecidePotentialMatch({ suggestedUserId: suggested.id, decision });

      setIsSwiping(true);
      await topCard.current.swipe(dir, 1.6); // Swipe the card!
      setIsSwiping(false);

      if (isSuper) {
        setOpenSuperLikedDialog(true);
      }
    }
  };

  useEffect(() => {
    // If we are not fetching, and we have less than 2 suggestions in the background, fetch one more
    if (!isPending && unaddressedSuggestionsCount < 2 && suggestions.length !== 0) {
      refetch();
    }
  }, [unaddressedSuggestionsCount, refetch, isPending, suggestions.length]);

  useEffect(() => {
    if (topCard.current) {
      topCard.current.restoreCard({ instant: true });
    }
  }, [resetCard]);

  const suggested = suggestions[0];
  const nextSuggestion = suggestions[0 + 1];

  const onCardLeftScreen = (dir: 'right' | 'left') => {
    const decision = dir === 'right' ? 'accept' : 'decline';

    setSuggestions((p) => p.filter((_, index) => index !== 0));
    setResetCard((p) => p + 1);

    if (!suggested.addressed) {
      callDecidePotentialMatch({ suggestedUserId: suggested.id, decision });
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (potentialMatches && potentialMatches.length !== 0 && suggestions.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        height: '100%',
        p: 4,
      }}
    >
      {suggested ? (
        <>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              aspectRatio: 1,
            }}
          >
            {nextSuggestion && (
              <Box
                zIndex={0}
                position="absolute"
                p={2}
                lineHeight={0}
                height="100%"
                boxSizing="border-box"
                sx={{ aspectRatio: 1 }}
              >
                <ImageCard
                  image={nextSuggestion.photo}
                  age={nextSuggestion.age}
                  description=""
                  name={nextSuggestion.firstName}
                />
              </Box>
            )}

            <Box height="100%" boxSizing="border-box" sx={{ aspectRatio: 1 }}>
              <TinderCard ref={topCard} onCardLeftScreen={onCardLeftScreen} preventSwipe={['up', 'down']}>
                <ImageCard image={suggested.photo} age={suggested.age} description="" name={suggested.firstName} />
              </TinderCard>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" my={4} px={2}>
            <PawButton
              color="red"
              disabled={isSwiping}
              onClick={() => swipe('left')}
              sx={{ transform: 'rotate(180deg)' }}
            />
            {user?.canSuperPaw && (
              <PawButton
                color="blue"
                disabled={isSwiping}
                onClick={() => swipe('right', true)}
                sx={{ transform: 'scale(125%)' }}
              />
            )}
            <PawButton color="green" disabled={isSwiping} onClick={() => swipe('right')} />
          </Box>
        </>
      ) : (
        <Typography variant="h5" color="#444">
          {"We're all out of matches,"}
          <br /> try again tomorrow! 🐶
        </Typography>
      )}

      <Dialog open={!!openSuperLikedDialog} onClose={() => setOpenSuperLikedDialog(false)}>
        <DialogTitle>You&apos;ve sent a super paw!</DialogTitle>
        <DialogContent>Send your first message now!</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenSuperLikedDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate({ to: superLikeChatId ? `/chats/${superLikeChatId}` : '/chats' })}
            color="primary"
          >
            Go to chat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
