package com.application.prodevblogs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String imageUrl;
    private String firstName;
    private String lastName;
    private String emailId;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Blog> blog;
    @OneToMany(cascade = {CascadeType.REMOVE,CascadeType.REFRESH})
    private List<BlogFiles> blogFiles;
}
