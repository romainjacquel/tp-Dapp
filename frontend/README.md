# DApp de Vote

Cette DApp permet à ses utilisateurs de créer des propositions et de voter pour celles-ci de manière décentralisée.

## Technologie

- **Vote Décentralisé:** Permet aux utilisateurs de voter de manière sécurisée et transparente.
- **Intégration d'Hardhat:** Utilise Hardhat pour gérer la partie backend, la compilation des contrats intelligents, les tests, etc.
- **Technologies Frontend:** Utilise Next.js, React, Chakra UI, Rainbowkit, et TypeScript pour offrir une interface utilisateur réactive et conviviale.

## Fonctionnalités

- Enregistrement des électeurs
- Enregistrement des propositions
- Session de vote
- Comptabilisation des votes

## Contract

La faille a été corrigé comme suit: 

```solidity
if (proposalsArray[_id].voteCount > proposalsArray[winningProposalID].voteCount) {
    winningProposalID = _id;
}
```

## Pour correction

Lien vidéo: https://www.loom.com/share/1378e66338d34a13925d9e9d946562c6?sid=234b81c4-15cf-4e0f-97ce-3bad8059bc9d
Lien Déploiement: https://tp-dapp.vercel.app/
Déployé sur sépolia

Groupe constitué de :
Romain JACQUEL et
Kassim BOUZOUBAA

## Installation

Pour lancer localement cette application, assurez-vous d'avoir Node.js installé. Clonez le dépôt, puis exécutez les commandes suivantes :

```bash
# Installation des dépendances
yarn install

# Lancement de l'application en mode développement
yarn dev
