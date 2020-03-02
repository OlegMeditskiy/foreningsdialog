package se.foreningsdialog.forening.models.users;

import javax.persistence.Entity;

@Entity
public class Admin extends User {
    public Admin() {
    }

    public Admin (String username, String password){
        super(username,password);
    }
}
