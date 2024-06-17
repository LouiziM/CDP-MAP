import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const regionMapping = {
  1: { name: 'Laayoune-Saguia Hamra', clients: 850, satisfaction: 4.5, ca: '700.000 DH' },
  2: { name: 'ORIENTAL', clients: 600, satisfaction: 3.9, ca: '400.000 DH' },
  3: { name: 'Tanger-Tetouan-Hoceima', clients: 950, satisfaction: 4.8, ca: '900.000 DH' },
  4: { name: 'Fes-Meknes', clients: 750, satisfaction: 4.2, ca: '560.000 DH' },
  5: { name: 'Rabat-Sale-Kenitra', clients: 1200, satisfaction: 4.7, ca: '1.200.000 DH' },
  6: { name: 'Casablanca-Settat', clients: 1500, satisfaction: 4.9, ca: '1.500.000 DH' },
  7: { name: 'Beni Mellal-Khenifra', clients: 550, satisfaction: 3.8, ca: '350.000 DH' },
  8: { name: 'Daraa-Tafilelt', clients: 500, satisfaction: 4.0, ca: '300.000 DH' },
  9: { name: 'Souss Massa', clients: 700, satisfaction: 4.3, ca: '450.000 DH' },
  10: { name: 'Guelmim-Oued Noun', clients: 400, satisfaction: 3.5, ca: '250.000 DH' },
  11: { name: 'Dakhla-Oued Eddahabs', clients: 350, satisfaction: 3.6, ca: '200.000 DH' },
  12: { name: 'Marrakech-Safi', clients: 1100, satisfaction: 4.6, ca: '1.000.000 DH' }
};

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '10px',
    backgroundColor: '#fff',
    zIndex: 999,
    borderRadius: theme.spacing(1),
    marginRight: '12px',
    border: `1px solid ${theme.palette.blue.first}`,
    pointerEvents: 'none',
  },
  label: {
    color: theme.palette.blue.first,
  },
}));

const RegionDataDisplay = ({ markersData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const regionId = markersData?.results[0]?.region;
  const region = regionMapping[regionId] || { name: 'Unknown Region', clients: 0, satisfaction: 0, ca: '0 DH' };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          {region.name}
        </Typography>
        <Typography>
          <strong className={classes.label}>Nombre de clients :</strong> {region.clients} <br />
          <strong className={classes.label}>Satisfaction :</strong> {region.satisfaction} <br />
          <strong className={classes.label}>CA :</strong> {region.ca}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RegionDataDisplay;
