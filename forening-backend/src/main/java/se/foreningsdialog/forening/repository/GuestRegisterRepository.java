package se.foreningsdialog.forening.repository;

import org.springframework.data.repository.CrudRepository;
import se.foreningsdialog.forening.models.GuestRegister;

import java.util.UUID;

public interface GuestRegisterRepository extends CrudRepository<GuestRegister,Long> {
    GuestRegister findByUniqueKey(UUID uniqueKey);
    GuestRegister findByGuestId (Long Id);
}
