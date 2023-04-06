import Head from 'next/head';
import { StructuredText } from 'react-datocms/structured-text';
import { Footer } from '../../components/commons/Footer';
import { Menu } from '../../components/commons/Menu';
import cmsService from '../../services/cmsService';
import { Box, Text, theme } from '../../theme/components';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'f138c88d' } },
      { params: { id: 'h138c88d' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const query = `
    query {
      contentFaqQuestion {
        title
        content {
          value
        }
      }
    }
  `;
  const { data: {
    contentFaqQuestion: { title, content }
  } } = await cmsService({ query });

  return {
    props: {
      id,
      title,
      content,
    }
  };
}

export default function FAQQuestionScreen({ title, content }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            gap: theme.space.x4,
            flexDirection: 'column',
            width: '100%',
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: 'auto',
          }}
        >
          <Text tag="h1" variant="heading1">
            {title}
          </Text>

          <StructuredText data={ content }/>
        </Box>
      </Box>

      <Footer />
    </>
  )
}
