import { ImDisplay } from "react-icons/im";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
     screens: {
          'custom-range': {'min':'0px','max':'500px'},
           'ch':'569px'
           },
      extend:{
          //colors: {
        // 'purple': '#6e308b',
       
        // 'orange': '#f57315',
        // 'light-blue': '#2596be',//#07aade',
        // 'dark-blue': '#496384',
      //},
      colors: { 
        'white':'#f5e9e6',
       ' primary': '#fed573',
        'secondary': '#455867',
       ' accent': '#E92085',
        'warning': '#F89128',
      },

    } 
    
  },
  plugins: [],
}

