import { RegisterForm } from '@/components/accounts/register';

import TwoColumnsLayout from '@/components/layouts/two-columns-layout';
import { BackgroundImage } from '@/components/ui/background-image';
import { AppConstants } from '@/common/app-constants';
import bgImage from '@/assets/bg/bg_02.jpg';

export default function LoginPage() {
  return (
    <TwoColumnsLayout 
      imagePosition={AppConstants.TwoColumnsLayout.ImagePosition.RIGHT}
      backgroundImageComponent={
        <BackgroundImage 
          imageSrc={bgImage} 
          imageAlt={AppConstants.TwoColumnsLayout.AltText.LOGIN_BACKGROUND} 
        />
      }
      formComponent={<RegisterForm />}
    />
  );
}