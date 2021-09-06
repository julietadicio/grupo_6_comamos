function join(t, a, s) {
   function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
   }
   let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
   let s = join(new Date, a, '-');
   return a.map(format).join(s);
} 