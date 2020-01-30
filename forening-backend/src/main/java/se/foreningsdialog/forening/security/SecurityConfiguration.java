package se.foreningsdialog.forening.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll() /*Part of Development for H2 Console with Spring Security*/
                .anyRequest().authenticated()
                .and()
                .httpBasic();

        http.cors();
        http.csrf().disable(); /*Part of Development for H2 Console with Spring Security*/
        http.headers().frameOptions().disable(); /*Part of Development for H2 Console with Spring Security*/

    }
}
