import Chart from 'chart.js';

export const parseTones = tones => {
  const documentTones = tones.document_tone.tones;
  return documentTones;
}

export const requestTones = async (content) => {
  const data = {toneInput: {text: content}}

  const res = await fetch("http://localhost:3000/api/tone", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const toneResponse = await res.json();
  const tones = parseTones(toneResponse);
  return tones;
}

export const createChart = (ref, data) => (new Chart(ref, {
type: 'bar',
data: {
    labels: data.map(tone => tone.tone_name),
    datasets: [{
        label: 'Sentiment Strength',
        data: data.map(tone => (tone.score * 100).toFixed()),
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 0
  }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
              }
            }]
          }
        }
    }));
