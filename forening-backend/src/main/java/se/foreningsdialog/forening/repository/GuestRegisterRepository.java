package se.foreningsdialog.forening.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foreningsdialog.forening.models.GuestRegister;

import java.util.UUID;

public interface GuestRegisterRepository extends JpaRepository<GuestRegister, Long> {
    GuestRegister findByUniqueKey(UUID uniqueKey);

    GuestRegister findByGuestId(Long Id);
}
