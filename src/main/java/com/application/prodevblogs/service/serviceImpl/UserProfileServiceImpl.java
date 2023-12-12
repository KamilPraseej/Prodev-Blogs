package com.application.prodevblogs.service.serviceImpl;

import com.application.prodevblogs.exceptions.UserProfileNotFoundException;
import com.application.prodevblogs.model.UserProfile;
import com.application.prodevblogs.repository.UserProfileRepository;
import com.application.prodevblogs.service.UserProfileService;
import com.application.prodevblogs.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userRepository;

    @Autowired
    public UserProfileServiceImpl(UserProfileRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserProfile createUserProfile(UserProfile userProfile) {
        try{
            if(!userRepository.existsByEmailId(userProfile.getEmailId())){
                return userRepository.save(userProfile);}
            else {
                throw new UserAlreadyExistsException("The Email is already exists");
            }
        }catch (UserAlreadyExistsException e) {
            throw new RuntimeException("The Email is already exists", e);
        }
    }

    @Override
    public UserProfile getUserProfileById(Long userProfileId) {
        Optional<UserProfile> userProfileOptional = userRepository.findById(userProfileId);
        return userProfileOptional.orElse(null);
    }

    @Override
    public List<UserProfile> getAllUserProfiles() {
        return userRepository.findAll();
    }

    @Override
    public UserProfile updateUserProfile(Long userProfileId, UserProfile userProfile) throws UserProfileNotFoundException {
        try {
            Optional<UserProfile> existingUserProfileOptional = userRepository.findById(userProfileId);

            if (existingUserProfileOptional.isPresent()) {
                UserProfile existingUserProfile = existingUserProfileOptional.get();

                existingUserProfile.setFirstName(userProfile.getFirstName());
                existingUserProfile.setLastName(userProfile.getLastName());
                existingUserProfile.setEmailId(userProfile.getEmailId());

                return userRepository.save(existingUserProfile);
            } else {
                throw new UserProfileNotFoundException("User profile with ID " + userProfileId + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating user profile", e);
        }
    }

    @Override
    public void deleteUserProfile(Long userProfileId) throws UserProfileNotFoundException {
        try {
            Optional<UserProfile> userProfileOptional = userRepository.findById(userProfileId);

            if (userProfileOptional.isPresent()) {
                userRepository.deleteById(userProfileId);
            } else {
                throw new UserProfileNotFoundException("User profile with ID " + userProfileId + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user profile", e);
        }
    }


}
