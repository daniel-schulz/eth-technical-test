import {useEffect, useState} from "react";

export const useAssessmentMetric = (userId: string) => {
  const [metric, setMetric] = useState<any>(null);

  useEffect(() => {
    const fetchMetric = async () => {
      if (!userId) return;

      try {
        const url = new URL(window.location.href);
        const apiEndpoint = `${url}/Data/${userId}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMetric(data);
      } catch (error) {
        console.error('Failed to fetch metric data:', error);
        setMetric(null);
      }
    };

    fetchMetric();
  }, [userId]);

  return metric;
};
