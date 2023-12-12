package com.application.prodevblogs.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogFiles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long blogFileId;
    @NotNull
    private String path;
    @NotNull
    private Long size;

    @ManyToOne(cascade = CascadeType.DETACH)
    private  UserProfile userProfile;
    @OneToOne
    private Blog blog;


}
