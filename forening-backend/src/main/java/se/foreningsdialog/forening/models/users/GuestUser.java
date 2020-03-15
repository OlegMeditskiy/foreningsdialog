package se.foreningsdialog.forening.models.users;

import javax.persistence.Entity;

@Entity
public class GuestUser extends User {

    public GuestUser() {
    }

    public GuestUser(String username, String password) {
        super(username, password);
    }
}
