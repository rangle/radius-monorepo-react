import { RadiusButton, RadiusAutoBox } from '@rangle/radius-react-core-components';

export default function Index() {
  console.log(RadiusButton)
  return (
    <>
      <RadiusAutoBox
        alignment="center"
        as="div"
        direction="vertical"
        height="200px"
        padding={20}
        space="auto"
        width="fill-parent"
        effect={[{ type: 'drop-shadow', color: 'var(--color-core-neutral-500)', offset: [0, 0], blur: 20 }]}
      >
        Hello There :)
        {/* <button> Hello world </button> */}
        <RadiusButton variant="primary">Learn more</RadiusButton>
        {/* <RadiusButton>Get Started</RadiusButton> */}
      </RadiusAutoBox>
    </>
  );
}
