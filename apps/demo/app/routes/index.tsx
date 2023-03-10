import React from 'react';
import { RadiusHero } from '@rangle/radius-react-core-components';
import { TextAndImage } from '@rangle/radius-react-core-components';
import { Typography } from '@rangle/radius-react-core-components';
import { RadiusAutoBox } from '@rangle/radius-react-core-components';

export default function Index() {
  return (
    <>
      <RadiusHero
        title="Design systems, Accelerated"
        eyebrow="For business"
        buttonLabel="Get info"
        imageSrc="images/header-development.png"
        ctaUrl="/posts"
      />

      <RadiusAutoBox fill="var(--color-core-neutral-200)">
        <RadiusAutoBox
          as="section"
          direction="vertical"
          style={{ maxWidth: 1280, padding: '6rem 12rem', margin: '0 auto' }}
        >
          <Typography
            as="h2"
            font="var(--typography-heading-xl)"
            color="var(--color-text-on-base-primary)"
            align="center"
            style={{ marginBottom: '2rem', alignSelf: 'center' }}
          >
            The benefits of Radius
          </Typography>
          <RadiusAutoBox>
            <TextAndImage
              title=""
              body="Eliminates ⅔ of time and money needed to build your core design system"
              headingLevel="h3"
              src="images/clock.svg"
              alt="placeholder image"
              style={{ margin: '3rem' }}
            />
            <TextAndImage
              title=""
              body="The right tools to accommodate ideation, change management, and adoption"
              headingLevel="h3"
              src="images/wrench.svg"
              alt="placeholder image"
              style={{ margin: '3rem' }}
            />
          </RadiusAutoBox>
          <RadiusAutoBox padding="25px">
            <TextAndImage
              title=""
              body="Built-in documentation, design flow, component library, and developer sandbox"
              headingLevel="h3"
              src="images/flow.svg"
              alt="placeholder image"
              style={{ margin: '3rem' }}
            />
            <TextAndImage
              title=""
              body="Teams are empowered to iterate and solve the right problems, faster"
              headingLevel="h3"
              src="images/heart.svg"
              alt="placeholder image"
              style={{ margin: '3rem' }}
            />
          </RadiusAutoBox>

          <Typography
            font="var(--typography-body-md)"
            color="var(--color-text-on-base-secondary)"
          >
            Tune your design system to solve the big-picture problems your
            business is facing now. Radius handles the structure of your design
            system, so your leaders and product teams can focus on the business
            outcomes.
          </Typography>
        </RadiusAutoBox>
      </RadiusAutoBox>

      <RadiusAutoBox
        as="section"
        direction="vertical"
        fill="var(--color-background-base)"
        style={{ maxWidth: 1280, padding: '6rem 12rem', margin: '0 auto' }}
      >
        <Typography
          as="h2"
          font="var(--typography-heading-xl)"
          color="var(--color-text-on-base-primary)"
          align="center"
          style={{ marginBottom: '4rem', alignSelf: 'center' }}
        >
          What makes Radius different?
        </Typography>

        <RadiusAutoBox padding="25px">
          <TextAndImage
            title="It’s Flexible"
            body="Fit your design system build to your organization’s own ecosystem of tooling, processes and vendors, and scale as your product lines grow"
            headingLevel="h3"
            src="images/flexible.png"
            alt="placeholder image"
          />
        </RadiusAutoBox>
        <RadiusAutoBox padding="25px">
          <TextAndImage
            title="It’s Focused"
            body="Radius solves your business case and empowers you to communicate your brand, rather than focusing on building as many components as possible"
            headingLevel="h3"
            src="images/focused.png"
            alt="placeholder image"
            media="right"
          />
        </RadiusAutoBox>
      </RadiusAutoBox>
    </>
  );
}
