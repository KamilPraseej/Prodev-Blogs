package com.application.prodevblogs.service.serviceImpl;

import org.apache.commons.net.ftp.FTPFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.integration.file.FileHeaders;
import org.springframework.integration.ftp.dsl.Ftp;
import org.springframework.integration.ftp.session.DefaultFtpSessionFactory;
import org.springframework.integration.ftp.session.FtpRemoteFileTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class FtpServiceImpl {

    private FtpRemoteFileTemplate ftpRemoteFileTemplate;

    @Autowired
    public FtpServiceImpl(FtpRemoteFileTemplate ftpRemoteFileTemplate) {
        this.ftpRemoteFileTemplate = ftpRemoteFileTemplate;
        System.out.println(ftpRemoteFileTemplate.getSession().isOpen());
        System.out.println(ftpRemoteFileTemplate.getSession().test());
    }

    public String saveFile(MultipartFile file) throws Exception {
        try {
        boolean success = false;
       FTPFile[] ftp = ftpRemoteFileTemplate.list("Desktop/");
            Arrays.asList(ftp).stream().forEach(ftpFile -> System.out.println(ftpFile.getName()));
            ftpRemoteFileTemplate.execute(e->{e.write(file.getInputStream(),"data/"+file.getOriginalFilename()); return null;});
            return file.getOriginalFilename();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public List<String> getAllList() throws IOException {
       return  List.of(ftpRemoteFileTemplate.getSession().listNames(""));
    }

    public MultipartFile getFile(String file) throws IOException {
//        ftpRemoteFileTemplate.getSession().read(file);
//      System.out.println(ftpRemoteFileTemplate.getSession().read(file,new FileOutputStream()));
        return null;
    }
}
