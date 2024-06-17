import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import { separateNumbersWithSpaces } from '../../utils/separateNumbers';

const ClusterInfo = ({ theme, cluster }) => {
  const clustersData = [
    {
      label: "Cluster 0",
      characteristics: [
        "Prix de vente moyen : 46 883 €",
        "Années : 2013 et 2014",
        "Nombre de commandes : La plupart ont passé 2 commandes",
        "Type de voiture : Principalement des sedans et des SUVs",
        "Service après-vente (SAV) : 15,8% de clients ont utilisé le SAV",
        "Méthode de paiement : Crédit",
        "Satisfaction : Moyenne de 3,6",
        "VN/VO : Véhicules neufs",
        "Groupe de couleur : Neutres (blanc, gris, noir, etc.)"
      ],
      strategies: [
        "Mettre en place un programme de fidélité offrant des réductions ou des avantages spéciaux pour chaque nouvelle commande effectuée.",
        "Offrir des points de fidélité supplémentaires pour l'achat de véhicules neufs.",
        "Envoyer des offres spéciales sur les nouveaux modèles de sedans et SUVs.",
        "Proposer des extensions de garanties ou des services de maintenance gratuits pour augmenter la satisfaction.",
        "Proposer des réductions sur les services après-vente pour encourager plus de clients à utiliser ces services.",
        "Offrir des suivis personnalisés et des rappels pour les services de maintenance.",
        "Utiliser des canaux de communication préférés par ce segment, comme les e-mails et les appels téléphoniques, pour des offres et des rappels personnalisés.",
        "Envoyer des newsletters avec des conseils sur l'entretien des véhicules neufs."
      ]
    },
    {
      label: "Cluster 1",
      characteristics: [
        "Prix de vente moyen : 78 677 €",
        "Années : 2012 et autres",
        "Nombre de commandes : Principalement 3 commandes",
        "Type de voiture : Sedans, SUVs, hatchbacks, et minivans",
        "Service après-vente (SAV) : 23,98% de clients ont utilisé le SAV",
        "Méthode de paiement : Crédit",
        "Satisfaction : Moyenne de 2,8",
        "VN/VO : Véhicules d'occasion",
        "Groupe de couleur : Neutres et chaudes"
      ],
      strategies: [
        "Proposer des offres de reprise avantageuses pour encourager l'achat de véhicules neufs.",
        "Offrir des incitations pour l'achat de véhicules d'occasion certifiés.",
        "Effectuer des enquêtes de satisfaction pour identifier les points de douleur et améliorer les services.",
        "Offrir des consultations gratuites pour aider les clients à choisir le véhicule le mieux adapté à leurs besoins.",
        "Proposer des packs de services après-vente à prix réduit.",
        "Offrir des contrôles techniques gratuits ou des réductions sur les pièces de rechange.",
        "Utiliser une combinaison de courriels, de SMS et de publicités sur les réseaux sociaux pour atteindre ce segment.",
        "Créer du contenu marketing mettant en avant les avantages des véhicules d'occasion."
      ]
    },
    {
      label: "Cluster 2",
      characteristics: [
        "Prix de vente moyen : 33 800 €",
        "Années : 2012 et autres",
        "Nombre de commandes : Principalement 2 commandes",
        "Type de voiture : Sedans et SUVs",
        "Service après-vente (SAV) : 10,98% de clients ont utilisé le SAV",
        "Méthode de paiement : Cash",
        "Satisfaction : Moyenne de 3,5",
        "VN/VO : Véhicules d'occasion",
        "Groupe de couleur : Neutres"
      ],
      strategies: [
        "Proposer des réductions pour les achats en cash, en particulier sur les véhicules d'occasion.",
        "Offrir des packages de services après-vente à prix réduit pour augmenter l'utilisation du SAV.",
        "Organiser des événements exclusifs pour les clients fidèles.",
        "Offrir des essais gratuits de nouveaux modèles de voitures.",
        "Envoyer des notifications de rappel pour les entretiens réguliers.",
        "Utiliser des campagnes d'emailing pour informer les clients des nouvelles offres et promotions.",
        "Créer des offres sur mesure en fonction des habitudes d'achat et des préférences des clients.",
        "Proposer des accessoires et des services complémentaires adaptés aux véhicules possédés."
      ]
    },
    {
      label: "Cluster 3",
      characteristics: [
        "Prix de vente moyen : 26 806 €",
        "Années : 2013, 2014 et 2012",
        "Nombre de commandes : Principalement 2 commandes",
        "Type de voiture : Sedans et SUVs",
        "Service après-vente (SAV) : 7,91% de clients ont utilisé le SAV",
        "Méthode de paiement : Cash",
        "Satisfaction : Moyenne de 2,5",
        "VN/VO : Véhicules neufs",
        "Groupe de couleur : Neutres"
      ],
      strategies: [
        "Offrir des incitations financières pour l'achat de véhicules neufs.",
        "Proposer des réductions sur les services après-vente pour encourager leur utilisation.",
        "Effectuer des suivis réguliers post-vente pour identifier et résoudre les problèmes rapidement.",
        "Offrir des formations gratuites sur l'entretien des véhicules pour augmenter la satisfaction.",
        "Utiliser des campagnes de marketing direct pour informer les clients des nouvelles offres et des avantages de l'achat de véhicules neufs.",
        "Créer des publicités ciblées sur les réseaux sociaux mettant en avant les véhicules neufs et leurs caractéristiques.",
        "Adapter les communications et les offres en fonction des préférences et des comportements des clients.",
        "Proposer des services personnalisés tels que des rendez-vous de maintenance planifiés et des offres spéciales sur les accessoires de voiture."
      ]
    }
  ];

  const { label, characteristics, strategies } = clustersData[cluster];

  const splitCharacteristics = characteristics.map(item => {
    const [key, value] = item.split(' : ');
    return { key, value };
  });

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: "flex" }}>
      <Box
        p="20px"
        height={"100%"}
        width={"100%"}
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.white.first}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first}>
            Recommendations CRM
          </Typography>
          <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first}>
            {label}
          </Typography>
        </Box>

        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%' }} />

        <Grid container spacing={2} mt={2}>
          <Grid item md={6} sm={12} xs={12}>
            <Typography align="center" variant="h3" fontWeight="bold" color={theme.palette.blue.first}>
              Caractéristiques
            </Typography>
            <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '190px' }} />
            {splitCharacteristics.map((item, index) => (
              <Box key={index} mt={2} display="flex" alignItems="baseline">
                <Typography component="span" style={{ fontSize: '1.5em', color: theme.palette.blue.first, fontWeight: 'bold' }}>
                  •
                </Typography>
                <Typography component="span" style={{ color: theme.palette.blue.first, fontWeight: 'bold', marginLeft: '8px' }}>
                  {item.key} :
                </Typography>
                <Typography component="span" style={{ marginLeft: '8px', fontWeight: 'normal', color: 'inherit' }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Typography align="center" variant="h3" fontWeight="bold" color={theme.palette.blue.first}>
              Stratégies CRM
            </Typography>
            <hr style={{marginBottom:'20px', border: `1px solid ${theme.palette.blue.first}`, width: '180px' }} />
            {strategies.map((item, index) => (
              <Box key={index} mt={1} display="flex" alignItems="baseline">
                <Typography component="span" style={{ fontSize: '1.5em', color: theme.palette.blue.first, fontWeight: 'bold' }}>
                  •
                </Typography>
                <Typography component="span" style={{ marginLeft: '8px', fontWeight: 'normal', color: 'inherit' }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ClusterInfo;
