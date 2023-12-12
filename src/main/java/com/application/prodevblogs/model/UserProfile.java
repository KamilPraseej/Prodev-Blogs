package com.application.prodevblogs.model;

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

    @OneToMany
    private List<Blog> blog;
    @OneToMany(cascade = {CascadeType.REMOVE,CascadeType.REFRESH})
    private List<BlogFiles> blogFiles;
}
