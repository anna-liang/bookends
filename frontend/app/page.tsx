import { SocialButton } from '@/app/components/base/buttons/social-button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <a href={`${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/google`}>
        <SocialButton social="google" theme="brand">
          Sign in with Google
        </SocialButton>
      </a>
    </div>
  );
}
