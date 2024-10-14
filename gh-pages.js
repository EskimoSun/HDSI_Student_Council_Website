import { publish } from 'gh-pages';

publish(
 '/Client/public',
 {
   branch: 'gh-pages',
   repo: 'https://github.com/EskimoSun/HDSI_Student_Council_Website.git', 
   user: {
     name: 'David Sun',
     email: 'dasun@ucsd.edu' 
   },
   dotfiles: true
 },
 () => {
   console.log('Deploy Complete!');
 }
);