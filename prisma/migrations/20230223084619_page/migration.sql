-- CreateEnum
CREATE TYPE "role" AS ENUM ('administrateur', 'conseiller', 'jeune', 'moderateur');

-- CreateTable
CREATE TABLE "administrateur" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "administrateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conseiller" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "conseiller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "est_attribuer" (
    "id_jeune" INTEGER NOT NULL,
    "id_conseiller" INTEGER NOT NULL,

    CONSTRAINT "est_attribuer_pkey" PRIMARY KEY ("id_jeune","id_conseiller")
);

-- CreateTable
CREATE TABLE "gere" (
    "id_administrateur" INTEGER NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "gere_pkey" PRIMARY KEY ("id_administrateur","id_utilisateur")
);

-- CreateTable
CREATE TABLE "inscrit" (
    "id_jeune" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "inscrit_pkey" PRIMARY KEY ("id_jeune","id_post")
);

-- CreateTable
CREATE TABLE "jeune" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "jeune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moderateur" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "moderateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peut_gerer" (
    "id_moderateur" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "peut_gerer_pkey" PRIMARY KEY ("id_moderateur","id_post")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(50),
    "date_creation" DATE,
    "date_suppression" DATE,
    "url_img" VARCHAR(50),
    "img_description" VARCHAR(50),
    "img_titre" VARCHAR(50),
    "sous_titre" VARCHAR(50),
    "contenu" TEXT,
    "description" VARCHAR(250),
    "meta_title" VARCHAR(50),
    "categories" VARCHAR(50),
    "url_video" VARCHAR(350),
    "slug" VARCHAR(50),
    "tags" VARCHAR(50),
    "status" VARCHAR(50),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "id" SERIAL NOT NULL,
    "contenu" TEXT,
    "url_img" VARCHAR(50),
    "url_video" VARCHAR(50),
    "meta_title" VARCHAR(50),
    "tags" VARCHAR(50),
    "administrateurId" INTEGER,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creer" (
    "id_page" INTEGER NOT NULL,
    "id_administrateur" INTEGER NOT NULL,

    CONSTRAINT "creer_pkey" PRIMARY KEY ("id_administrateur","id_page")
);

-- CreateTable
CREATE TABLE "redige" (
    "id_conseiller" INTEGER NOT NULL,
    "id_moderateur" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "redige_pkey" PRIMARY KEY ("id_conseiller","id_moderateur","id_post")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(50),
    "email" VARCHAR(50),
    "nom" VARCHAR(50),
    "prenom" VARCHAR(50),
    "date_naissance" DATE,
    "mot_de_passe" VARCHAR(50),
    "telephone" VARCHAR(50),
    "nationalite" VARCHAR(50),
    "adresse" VARCHAR(50),
    "role" "role" NOT NULL DEFAULT 'jeune',

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "administrateur" ADD CONSTRAINT "administrateur_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conseiller" ADD CONSTRAINT "conseiller_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "est_attribuer" ADD CONSTRAINT "est_attribuer_id_conseiller_fkey" FOREIGN KEY ("id_conseiller") REFERENCES "conseiller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "est_attribuer" ADD CONSTRAINT "est_attribuer_id_jeune_fkey" FOREIGN KEY ("id_jeune") REFERENCES "jeune"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gere" ADD CONSTRAINT "gere_id_administrateur_fkey" FOREIGN KEY ("id_administrateur") REFERENCES "administrateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gere" ADD CONSTRAINT "gere_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inscrit" ADD CONSTRAINT "inscrit_id_jeune_fkey" FOREIGN KEY ("id_jeune") REFERENCES "jeune"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inscrit" ADD CONSTRAINT "inscrit_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jeune" ADD CONSTRAINT "jeune_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "moderateur" ADD CONSTRAINT "moderateur_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "peut_gerer" ADD CONSTRAINT "peut_gerer_id_moderateur_fkey" FOREIGN KEY ("id_moderateur") REFERENCES "moderateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "peut_gerer" ADD CONSTRAINT "peut_gerer_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_administrateurId_fkey" FOREIGN KEY ("administrateurId") REFERENCES "administrateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creer" ADD CONSTRAINT "creer_id_administrateur_fkey" FOREIGN KEY ("id_administrateur") REFERENCES "administrateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "creer" ADD CONSTRAINT "creer_id_page_fkey" FOREIGN KEY ("id_page") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "redige" ADD CONSTRAINT "redige_id_conseiller_fkey" FOREIGN KEY ("id_conseiller") REFERENCES "conseiller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "redige" ADD CONSTRAINT "redige_id_moderateur_fkey" FOREIGN KEY ("id_moderateur") REFERENCES "moderateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "redige" ADD CONSTRAINT "redige_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
