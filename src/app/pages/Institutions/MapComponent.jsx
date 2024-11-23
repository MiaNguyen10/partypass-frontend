import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function MapComponent({ mapUrl }) {
  return (
    <Box
      className="w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg"
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: 'grey.300',
        mt: 2,
      }}
    >
      <iframe
        title="Map"
        src={mapUrl}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </Box>
  );
}

MapComponent.propTypes = {
  mapUrl: PropTypes.string.isRequired,
};

export default MapComponent;
