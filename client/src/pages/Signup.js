import Header from '../components/Header';
import Signup from '../components/Signup';

export default function SignupPage() {
  return (
    <div className=" flex justify-center items-center">
      <div className="max-w-md">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <Signup />
      </div>
    </div>
  );
}
