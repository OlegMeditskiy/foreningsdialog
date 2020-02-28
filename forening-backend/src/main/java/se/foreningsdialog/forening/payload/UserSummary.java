package se.foreningsdialog.forening.payload;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserSummary {
    private Long id;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;

    public UserSummary(Long id, String username, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
