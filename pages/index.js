import { Container, Grid, Heading, Image } from 'theme-ui'
import remark from 'remark'
import withImages from 'remark-with-images'

const parse = async function (data) {
  const {
    contents: markdown,
    data: { images }
  } = await remark().use(withImages).process(data)

  // do something with markdown and images array

  return {
    markdown,
    images
  }
}

export default function Index({ images }) {
  return (
    <div
      style={{
        background:
          'url(https://css-tricks.com/wp-content/uploads/2019/12/rainbow-stripes.jpg)'
      }}
    >
      <Container>
        <Heading
          sx={{
            fontSize: '7em',
            textAlign: 'center',
            py: 2,
            textShadow: 'card',
            color: 'white',
            textDecoration: 'underline'
          }}
        >
          The Roaring Gallery
        </Heading>
        <Grid columns={[2, 4]} pb={4}>
          {images.map(x => (
            <Image
              src={`https://raw.githubusercontent.com/hackclub/dinosaurs/main/${x.original_url}`}
              width="100%"
              sx={{ transition: '1s ease-in-out', transform: 'rotate(0deg)', background: 'white', borderRadius: 5, boxShadow: 'card', '&:hover': {
                transform: 'rotate(180deg)',
               
               }}}
            />
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export async function getStaticProps() {
  const images = await parse(
    await fetch(
      'https://raw.githubusercontent.com/hackclub/dinosaurs/main/README.md'
    ).then(r => r.text())
  )
  return { props: { images: images.images } }
}
