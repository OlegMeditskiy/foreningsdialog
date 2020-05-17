package se.foreningsdialog.forening.payload.common;

import java.util.Date;

public class UserProfile {
    private Long id;
    private String username;
    private Date joinedAt;

    public UserProfile(Long id, String username, Date joinedAt) {
        this.id = id;
        this.username = username;
        this.joinedAt = joinedAt;
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

    public Date getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Date joinedAt) {
        this.joinedAt = joinedAt;
    }

}
