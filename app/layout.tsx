node -e "
const fs = require('fs');
let c = fs.readFileSync('app/layout.tsx', 'utf8');
c = c.replace(
  \"import Footer from '@/app/_components/Footer';\",
  \"import FooterWrapper from '@/app/_components/FooterWrapper';\"
);
c = c.replace(
  \"import Header from '@/app/_components/Header';\",
  \"import HeaderWrapper from '@/app/_components/HeaderWrapper';\"
);
c = c.replace(
  \"import FloatingCTA from '@/app/_components/FloatingCTA';\",
  \"import FloatingCTAWrapper from '@/app/_components/FloatingCTAWrapper';\"
);
c = c.replace('<Header />', '<HeaderWrapper />');
c = c.replace('<Footer />', '<FooterWrapper />');
c = c.replace('<FloatingCTA />', '<FloatingCTAWrapper />');
fs.writeFileSync('app/layout.tsx', c);
console.log('done');
"
