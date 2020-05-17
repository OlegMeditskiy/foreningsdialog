package se.foreningsdialog.forening.models.users;

import javax.persistence.Entity;

@Entity
public class MainAdmin extends User {
    public MainAdmin() {
    }

    public MainAdmin(String username, String password) {
        super(username, password);
    }
}
