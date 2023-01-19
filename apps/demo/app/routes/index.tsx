import { RadiusButton } from '@rangle/radius-react-core-components';

export default function Index() {
  console.log(RadiusButton)
  return (
    <>
      <div>
        Hello There :)
        {/* <button> Hello world </button> */}
        <RadiusButton variant="primary">Learn more</RadiusButton>
        {/* <RadiusButton>Get Started</RadiusButton> */}
      </div>
    </>
  );
}
