import { useEffect } from 'react';

export default function TitleSet() {
  useEffect(() => {
    (document.title = "Stopwatch");
  });
};