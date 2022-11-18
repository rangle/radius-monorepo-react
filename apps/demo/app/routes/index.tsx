import { RadiusButton } from '@rangle/radius-react-core-components';
export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Radius Core Component</h1>
      <p>
        A collection of essential components that will help you fast-forward
        your Design System
      </p>
      <div>
        <RadiusButton>Learn more</RadiusButton>
        <RadiusButton variant="primary">Get Started</RadiusButton>
      </div>
    </div>
  );
}
