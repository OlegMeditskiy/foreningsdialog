-- INSERT INTO roles(name) VALUES('ROLE_USER')ON CONFLICT (name) DO NOTHING;
-- INSERT INTO roles(name) VALUES('ROLE_GUEST')ON CONFLICT (name) DO NOTHING;
-- INSERT INTO roles(name) VALUES('ROLE_ADMIN')ON CONFLICT (name) DO NOTHING;
-- INSERT INTO roles(name) VALUES('ROLE_SUPER_ADMIN')ON CONFLICT (name) DO NOTHING;
-- INSERT INTO roles(name) VALUES('ROLE_MAIN_ADMIN')ON CONFLICT (name) DO NOTHING;
--
-- INSERT INTO users(dtype,username,password) VALUES('MainAdmin','barosen@gmail.com','123456') ON CONFLICT (username) DO NOTHING;