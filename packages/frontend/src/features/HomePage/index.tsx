/* +++++++++++++++++++++++++++++++++++++++++++++++++ Imports +++++++++++++++++++++++++++++++++++++++++++++++++ */
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { getPotentialMatches } from '../../api/get-potential-matches';
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

  useEffect(() => {
    if (!res) return;

    setSuggestions((p) => [
      ...p.filter((suggestion) => !suggestion.addressed),
      ...res.data.map((x: any) => ({ ...x, addressed: false })),
    ]);
  }, [res]);

  const swipe = async (dir: 'left' | 'right') => {
    if (topCard.current) {
      setIsSwiping(true);
      await topCard.current.swipe(dir, 1.6); // Swipe the card!
      setIsSwiping(false);
    }
  };

  useEffect(() => {
    if (topCard.current) {
      topCard.current.restoreCard({ instant: true });
    }

    if (suggestions.length - suggestionIndex <= 5 && !isPending) {
      refetch();
    }
  }, [isPending, refetch, suggestionIndex, suggestions.length, topCard]);

  const suggested = suggestions[suggestionIndex];
  const nextSuggestion = suggestions[suggestionIndex + 1];

  const onCardLeftScreen = (dir: 'right' | 'left') => {
    setSuggestionIndex((p) => p + 1);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Box py={4} display="flex" flexDirection="column" boxSizing="border-box" height="100%">
      {suggested ? (
        <>
          <Box position="relative" overflow="hidden" flexGrow={1}>
            {nextSuggestion && (
              <Box zIndex={0} position="absolute" px={4}>
                <ImageCard
                  image={nextSuggestion.photo}
                  age={nextSuggestion.age}
                  description=""
                  name={nextSuggestion.firstName}
                />
              </Box>
            )}

            <Box px={4}>
              <TinderCard ref={topCard} onCardLeftScreen={onCardLeftScreen} preventSwipe={['up', 'down']}>
                <ImageCard image={suggested.photo} age={suggested.age} description="" name={suggested.firstName} />
              </TinderCard>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" px={4}>
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
