import { keyframes } from 'styled-components';

//____________ANIMATION____________
export const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
export const Fade_Animation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;
//____________ANIMATION____________