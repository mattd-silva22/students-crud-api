

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE USER students_api WITH PASSWORD 'Er4_2df78a1';
GRANT ALL PRIVILEGES ON public.students TO students_api;

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

INSERT INTO students (name, cpf, email)
VALUES
  ('Beatriz Sara Isabel Martins', '48263924944', 'beatriz.sara.martins@deskprint.com.br'),
  ('Severino Erick Melo', '78696479343', 'severinoerickmelo@agenciaph.com'),
  ('Carla Milena Lívia Duarte', '84155241293', 'carlamilenaduarte@imaxbrasil.com.br'),
  ('Isis Vera Freitas', '53097839038', 'isisverafreitas@boldcron.com.br'),
  ('Bianca Nicole Yasmin Bernardes', '28963894150', 'bianca_nicole_bernardes@tirel.com.br'),
  ('Lucas Bento Moreira', '33822294128', 'lucasbentomoreira@gmx.ca'),
  ('Maitê Elza Ana Rocha', '44881399306', 'maite_elza_rocha@atualvendas.com'),
  ('Elisa Tatiane Porto', '62956304135', 'elisa_tatiane_porto@pronursing.com.br'),
  ('Sabrina Bárbara Aurora Caldeira', '23951284307', 'sabrina.barbara.caldeira@creativeinteriores.com.br'),
  ('Sophia Kamilly Alice da Costa', '19783741942', 'sophia_dacosta@imail.com');



