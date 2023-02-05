var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;

spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();