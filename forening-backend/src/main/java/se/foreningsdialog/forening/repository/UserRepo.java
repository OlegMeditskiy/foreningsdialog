package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.foreningsdialog.forening.models.users.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    User findByUsername(String username);
}
