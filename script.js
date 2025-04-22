const ctx = document.getElementById('myChart');
const chart2 = document.getElementById('chart2')
const linechart = document.getElementById('linechart')


fetch('db.json')
.then(res=> res.json())
.then(data=>{
    const titles = data.movies.map(movie=> movie.title)
    const rating = data.movies.map(movie=> movie.rating)
    const years = data.movies.map(movie => movie.year);
    const genres = data.movies.map(movie => movie.genre);

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: titles,
          datasets: [{
            label: 'Rating',
            data: rating,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',   
              'rgba(54, 162, 235, 0.7)',  
              'rgba(255, 206, 86, 0.7)',   
              'rgba(75, 192, 192, 0.7)',   
              'rgba(153, 102, 255, 0.7)',  
              'rgba(255, 159, 64, 0.7)'     
            ],
            borderWidth: 1
            
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const genreCount = {};
      genres.forEach(g => {
        g.split(',').forEach(single => {
          const trimmed = single.trim();
          genreCount[trimmed] = (genreCount[trimmed] || 0) + 1;
        });
      });
  
      new Chart(chart2, {
        type: 'pie',
        data: {
          labels: Object.keys(genreCount),
          datasets: [{
            label: 'Genres',
            data: Object.values(genreCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ]
          }]
        }
      });
      const yearCount = {};
      years.forEach(year => {
        yearCount[year] = (yearCount[year] || 0) + 1;
      });
  
      new Chart(linechart, {
        type: 'line',
        data: {
          labels: Object.keys(yearCount),
          datasets: [{
            label: 'Movies per Year',
            data: Object.values(yearCount),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.3,
            fill: true
          }]
        }
      });
    });





