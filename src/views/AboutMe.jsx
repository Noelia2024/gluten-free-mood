import { Container, Box, Divider, Stack, Typography } from '@mui/material';

// Los tres pilares comparten estructura, asi que viven como datos: agregar o
// quitar uno es agregar o quitar una entrada, no reescribir JSX.
const pilares = [
  {
    icono: '🛡️',
    titulo: 'Seguridad Alimentaria y Cuidado',
    texto:
      'Cuento con la certificación de Manipulación de alimentos y trabajo con la máxima responsabilidad para evitar cualquier riesgo de contaminación cruzada, seleccionando materia prima certificada sin TACC.',
  },
  {
    icono: '🥐',
    titulo: 'Sabor y Frescura Real',
    texto:
      'Me enfoco en lograr panes y elaboraciones con textura suave, humedad justa y el sabor casero que tanto se extraña.',
  },
  {
    icono: '💬',
    titulo: 'Atención Cercana y Empática',
    texto:
      'Entiendo lo que significa comer sin gluten. Del otro lado de la pantalla hay alguien real para responder tus dudas sobre ingredientes, conservación o envíos.',
  },
];

const AboutMe = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h1" component="h1" gutterBottom>
        ¡Hola! Qué alegría que estés acá.
      </Typography>

      <Typography
        variant="h4"
        component="p"
        color="text.secondary"
        sx={{ mb: { xs: 5, md: 7 } }}
      >
        Conocé la historia y el corazón detrás de Gluten Free Mood.
      </Typography>

      {/* maxWidth en ch acota la medida de lectura: sin esto las lineas llegan
          a ~95 caracteres y el ojo pierde el retorno al leer. */}
      <Box sx={{ maxWidth: '68ch' }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Soy Aldana y quiero darte la bienvenida a mi espacio de panificación
          libre de gluten.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Detrás de cada masa, corte y horneado no hay procesos industriales ni
          fórmulas masivas: hay una persona apasionada por la cocina, trabajando
          todos los días para que disfrutes de comida rica, fresca y 100%
          segura.
        </Typography>

        {/* El copy traia cinco rotulos numerados. Eran anotaciones de la
            usuaria para marcar la estructura, no texto para publicar, asi que no
            se renderizan. El Divider conserva el ritmo entre bloques. */}
        <Divider sx={{ my: { xs: 4, md: 6 } }} />

        <Typography variant="body1" color="text.secondary" paragraph>
          Todo empezó como una necesidad (ya que yo también soy celíaca) y un
          deseo muy claro: quería crear un espacio donde comer libre de gluten no
          significara resignar sabor, textura ni momentos compartidos en la
          mesa.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Sé lo difícil que puede ser encontrar productos de panadería sin TACC
          que realmente enamoren el paladar, que no se desmiguen y que mantengan
          esa frescura que tanto nos gusta. Por eso, decidí meterme de lleno en
          la cocina, estudiar mezclas de harinas, probar recetas una y otra
          vez, y convertir esa búsqueda en un proyecto real.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Hoy, cada pan, factura, prepizza o elaboración que ves en la tienda no
          está acá por casualidad. Pasó por infinitas pruebas hasta lograr la
          calidad y el sabor que a mí misma me gusta llevar a mi mesa y
          compartir con quienes más quiero.
        </Typography>

        <Divider sx={{ my: { xs: 4, md: 6 } }} />

        <Typography variant="body1" color="text.secondary" paragraph>
          Para mí, elaborar alimentos sin gluten es un compromiso sagrado con tu
          salud y la de tu familia. Este emprendimiento se apoya en tres pilares
          fundamentales:
        </Typography>

        <Stack spacing={3} sx={{ mt: 2 }}>
          {pilares.map((pilar) => (
            <Box
              key={pilar.titulo}
              sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
            >
              {/* aria-hidden: el emoji es decorativo, el peso semantico lo
                  carga el titulo que va al lado. */}
              <Box
                aria-hidden="true"
                sx={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  bgcolor: 'background.default',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                }}
              >
                {pilar.icono}
              </Box>
              <Box>
                {/* component h2 porque es el unico nivel de encabezado que
                    queda bajo el h1: omitirlo rompe la navegacion por
                    encabezados. El tamano va por debajo del body1 a proposito:
                    el titulo rotula, la descripcion es la que informa. */}
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: '0.9375rem', fontWeight: 600, mb: 0.5 }}
                >
                  {pilar.titulo}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pilar.texto}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: { xs: 4, md: 6 } }} />

        <Typography variant="body1" color="text.secondary">
          Cada pedido, consulta o recomendación significa un mundo para este
          emprendimiento y me ayuda a seguir horneando con la misma ilusión del
          primer día. Gracias de corazón por confiar en mi trabajo y permitirme
          acompañarte en tu mesa.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutMe;