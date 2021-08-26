window.addEventListener('load', function join(t, a, s) {
   function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
   }
   return a.map(format).join(s);
}

) 
const a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
const s = join(new Date, a, '-');