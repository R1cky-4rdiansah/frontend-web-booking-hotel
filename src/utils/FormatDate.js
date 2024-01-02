export default (date) => {
      const d = new Date(date);
      const dtf = new Intl.DateTimeFormat("en", {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
      });

      const [{value: bulan}, , {value: hari}] = dtf.formatToParts(d)

      return `${hari} ${bulan}`
} 