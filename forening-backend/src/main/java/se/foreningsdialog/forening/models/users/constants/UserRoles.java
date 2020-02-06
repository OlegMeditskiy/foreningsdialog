package se.foreningsdialog.forening.models.users.constants;

import org.springframework.security.core.GrantedAuthority;

public enum UserRoles implements GrantedAuthority {
    ADMIN,MAIN_ADMIN,SUPER_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
