import Head from 'next/head';
import { StructuredText } from 'react-datocms/structured-text';
import { Footer } from '../../components/commons/Footer';
import { Menu } from '../../components/commons/Menu';
import cmsService from '../../services/cmsService';
import { Box, Text, theme } from '../../theme/components';

export async function getStaticPaths() {
  const query = `
    query {
      allContentFaqQuestions {
        id
      }
    }
  `;

  const { data } = await cmsService({ query });
  const paths = data.allContentFaqQuestions.map(({ id }) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const query = `
    query($id: ItemId) {
      contentFaqQuestion(filter: { id: { eq: $id } }) {
        title
        content {
          value
        }
      }
    }`;
  const { data: {
    contentFaqQuestion: { title, content }
  } } = await cmsService({ query, variables: { id } });

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
