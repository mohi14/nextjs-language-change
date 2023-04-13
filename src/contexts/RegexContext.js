import React, { createContext, useState, useEffect, useCallback } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const RegexContext = createContext();

function RegexProvider({ t, children }) {

  const [audioOn, setAudioOn] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState({ regex: '', extra: '' });
  const outPutRef = React.useRef();
  const [profiles, setProfiles] = useState([
    {
      name: 'Standard',
      config: {
        specialChar: false,
        specialCharValue: String.raw`(?:[s52][\W_]*?)*?`,
      },
      id: uuidv4(),
    },
  ]);

  const [options, setOptions] = useState('option-zero');
  const [currentProfile, setCurrentProfile] = useState('Standard');
  useEffect(() => {
    setAudioOn(
      !localStorage.getItem('audioOn') ||
      localStorage.getItem('audioOn') === 'true'
    );
    setProfiles(
      JSON.parse(localStorage.getItem('profiles')) || [
        {
          name: 'Standard',
          config: {
            specialChar: false,
            specialCharValue: String.raw`(?:[s52][\W_]*?)*?`,
          },
          id: uuidv4(),
        },
      ]
    );
    setOptions(localStorage.getItem('options') || 'option-zero');
    setCurrentProfile(localStorage.getItem('currentProfile') || 'Standard');
  }, []);
  const [editableProfile, setEditableProfile] = useState(profiles[1]?.id || '');
  const [currentProfileData, setCurrentProfileData] = useState({});
  const [currentProfileConfig, setCurrentProfileConfig] = useState(profiles[0].config);
  const [showProfileSettingsModal, setshowProfileSettingsModal] = useState(false);
  const [showCreateProfileModal, setshowCreateProfileModal] = useState(false);
  const [showEditProfileModal, setshowEditProfileModal] = useState(false);


  const handleCloseProfileSettingsModal = useCallback(() => setshowProfileSettingsModal(false), []);
  const handleshowProfileSettingsModal = useCallback(() => setshowProfileSettingsModal(true), []);
  const handleCloseCreateProfileModal = useCallback(() => setshowCreateProfileModal(false), []);
  const handleshowCreateProfileModal = useCallback(() => {
    if (profiles.length > 2) {
      toast.error(t('alert-profil-2'));
    } else {
      setshowCreateProfileModal(true);
    }
  }, [profiles.length, t]);

  const handleCloseEditProfileModal = useCallback(() => setshowEditProfileModal(false), []);
  const handleshowEditProfileModal = useCallback(() => setshowEditProfileModal(true), []);

  const createNewProfile = (name, config, id) => {
    if (!/^[a-zßäöü0-9]+$/.test(name)) {
      toast.error(t('alert-profil-az'));
      return;
    }
    if (name.split(' ').length > 1) {
      toast.error(t('alert-profil-leerzeichen'));
      return;
    }
    if (name === '') {
      toast.error(t('alert-profil-name'));
      return;
    }
    const checkExists = profiles.find((profile) => profile.name === name);
    if (checkExists) {
      toast.error(t('alert-profil-existiert'));
      return;
    }
    if (name.toLowerCase() === 'standard') {
      toast.error(t('alert-profil-reserviert'));
      return;
    }
    const newProfile = {
      id: id,
      name: name,
      config: config,
    };
    setProfiles([...profiles, newProfile]);
    setCurrentProfile(name);
    setshowCreateProfileModal(false);
    setshowProfileSettingsModal(false);
    localStorage.setItem('profiles', JSON.stringify([...profiles, newProfile]));
    localStorage.setItem('currentProfile', name);
    toast.success(t('alert-profil-gespeichert'));
  };

  const updateProfile = (name, config, id) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id === id) {
        return {
          name: name,
          config: config,
          id: id,
        };
      } else {
        return profile;
      }
    });
    setProfiles(newProfiles);
    setCurrentProfile(name);
    localStorage.setItem('currentProfile', name);

    localStorage.setItem('profiles', JSON.stringify(newProfiles));
    toast.success(t('alert-profil-aktualisiert'));
  };

  const deleteProfile = (name) => {
    if (name === 'Standard') {
      toast.error(t('alert-profil-standard'));
      return;
    }
    const newProfiles = profiles.filter((profile) => profile.name !== name);
    setProfiles(newProfiles);
    setCurrentProfile('Standard');
    localStorage.setItem('currentProfile', 'Standard');

    localStorage.setItem('profiles', JSON.stringify(newProfiles));
    setshowProfileSettingsModal(false);
    toast.success(t('alert-profil-gelöscht'));
  };

  const defaultProfile = profiles.find(
    (profile) => profile.name === 'Standard'
  );

  const changeOption = (option) => {
    setOptions(option);
    localStorage.setItem('options', option);
  };

  const changeCurrentProfile = (name) => {
    setCurrentProfile(name);
    localStorage.setItem('currentProfile', name);
  };


  if (typeof window !== 'undefined') {
    var play = new Audio();
    var source = document.createElement('source');
    source.src = '/click.mp3';
    source.type = 'audio/mpeg';
    play.appendChild(source);
    source = document.createElement('source');
    source.src = '/click.ogg';
    source.type = 'audio/ogg';
    play.appendChild(source);
  }

  async function playAudio() {
    if (audioOn) {
      await loadAudio();
      play.currentTime = 0;
      play.play().catch((err) => { });
    }
  }

  async function loadAudio() {
    return new Promise((resolve, reject) => {
      if (play.canPlayType('audio/mpeg') !== '') {
        play.children[0].src = '/click.mp3';
      } else if (play.canPlayType('audio/ogg') !== '') {
        play.children[0].src = '/click.ogg';
      } else {
        reject('No compatible audio format found.');
      }
      play.load();
      play.addEventListener('canplay', resolve);
    });
  }

  useIsomorphicLayoutEffect(() => {
    playAudio();
    // eslint-disable-next-line
  }, [
    showProfileSettingsModal,
    showEditProfileModal,
    showCreateProfileModal,
    profiles,
    setOutput,
  ]);

  useEffect(() => {
    setCurrentProfileData(
      profiles.find((profile) => profile.id === editableProfile)
    );
    
  }, [editableProfile, profiles]);

  useIsomorphicLayoutEffect(() => {
    const currentProf = profiles.find(
      (profile) => profile.name === currentProfile
    );
    setCurrentProfileConfig(currentProf?.config);
  }, [currentProfile, profiles]);


  return (
    <RegexContext.Provider
      value={{
        changeCurrentProfile,
        audioOn,
        setAudioOn,
        playAudio,
        input,
        output,
        profiles,
        currentProfile,
        setProfiles,
        setOutput,
        setInput,
        options,
        changeOption,
        showProfileSettingsModal,
        setshowProfileSettingsModal,
        handleCloseProfileSettingsModal,
        handleshowProfileSettingsModal,
        showCreateProfileModal,
        handleshowCreateProfileModal,
        handleCloseCreateProfileModal,
        createNewProfile,
        updateProfile,
        deleteProfile,
        defaultProfile,
        showEditProfileModal,
        handleshowEditProfileModal,
        handleCloseEditProfileModal,
        editableProfile,
        setEditableProfile,
        currentProfileData,
        outPutRef,
        currentProfileConfig,
      }}
    >
      {children}
    </RegexContext.Provider>
  );
}

export { RegexProvider };