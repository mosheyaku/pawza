import { Box, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { decidePotentialMatch, getPotentialMatches } from '../../api/potential-matches';
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
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const topCard = useRef<any>(null);

  const {
    data: res,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['suggestions'],
    queryFn: getPotentialMatches,
  });

  const { mutateAsync: callDecidePotentialMatch } = useMutation({
    mutationFn: (data: Parameters<typeof decidePotentialMatch>[0]) => decidePotentialMatch(data),
  });

  useEffect(() => {
    if (!res) return;

    setSuggestions((p) => [
      ...p.filter((suggestion) => !suggestion.addressed),
      ...res.data
        .filter((newSuggestion: any) => !p.find((existingSuggestion) => existingSuggestion.id === newSuggestion.id))
        .map((x: any) => ({ ...x, addressed: false })),
    ]);

    setSuggestionIndex(0);
  }, [res]);

  const swipe = async (dir: 'left' | 'right') => {
    if (topCard.current) {
      const decision = dir === 'right' ? 'accept' : 'decline';
      suggested.addressed = true;
      callDecidePotentialMatch({ suggestedUserId: suggested.id, decision });

      setIsSwiping(true);
      await topCard.current.swipe(dir, 1.6); // Swipe the card!
      setIsSwiping(false);
    }
  };

  useEffect(() => {
    if (topCard.current) {
      topCard.current.restoreCard({ instant: true });
    }

    if (
      suggestionIndex !== 0 &&
      suggestions.length &&
      suggestions.length - suggestionIndex <= 5 &&
      !isPending &&
      (!res || res.data.length !== 0)
    ) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionIndex]);

  const suggested = suggestions[suggestionIndex];
  const nextSuggestion = suggestions[suggestionIndex + 1];

  const onCardLeftScreen = (dir: 'right' | 'left') => {
    setSuggestionIndex((p) => p + 1);
    const decision = dir === 'right' ? 'accept' : 'decline';

    if (!suggested.addressed) {
      suggested.addressed = true;
      callDecidePotentialMatch({ suggestedUserId: suggested.id, decision });
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Box py={4} display="flex" flexDirection="column" justifyContent="center" boxSizing="border-box">
      {suggested ? (
        <>
          <Box position="relative" overflow="hidden" py={4} sx={{ aspectRatio: 1 }}>
            {nextSuggestion && (
              <Box
                zIndex={0}
                position="absolute"
                p={4}
                lineHeight={0}
                height="100%"
                width="100%"
                boxSizing="border-box"
              >
                <ImageCard
                  image={nextSuggestion.photo}
                  age={nextSuggestion.age}
                  description=""
                  name={nextSuggestion.firstName}
                />
              </Box>
            )}

            <Box p={4} height="100%">
              <TinderCard ref={topCard} onCardLeftScreen={onCardLeftScreen} preventSwipe={['up', 'down']}>
                <ImageCard image={suggested.photo} age={suggested.age} description="" name={suggested.firstName} />
              </TinderCard>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" px={8} my={4}>
            <PawButton color="red" disabled={isSwiping} onClick={() => swipe('left')} />
            <PawButton color="green" disabled={isSwiping} onClick={() => swipe('right')} />
          </Box>
        </>
      ) : (
        <Typography>{"We're all out of matches, try again tomorrow! 🐶"}</Typography>
      )}
    </Box>
  );
}

export default Home;
