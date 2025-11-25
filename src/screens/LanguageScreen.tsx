import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'id', nameKey: 'language.languages.id', nativeName: 'Bahasa Indonesia' },
  { code: 'en', nameKey: 'language.languages.en', nativeName: 'English' },
  { code: 'jw', nameKey: 'language.languages.jw', nativeName: 'Basa Jawa' },
  { code: 'su', nameKey: 'language.languages.su', nativeName: 'Basa Sunda' },
];

const LanguageScreen = ({ navigation }) => {
  const { language: currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageSelect = async (languageCode: string) => {
    await setLanguage(languageCode as any);
    const languageName = languages.find(lang => lang.code === languageCode)?.nativeName || languageCode;
    Alert.alert(
      t('common.success'),
      t('language.changeSuccess').replace('{{language}}', languageName),
      [
        {
          text: t('common.ok'),
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('language.title')}</Text>
      <Text style={styles.subtitle}>{t('language.subtitle')}</Text>

      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              currentLanguage === language.code && styles.selectedLanguageItem,
            ]}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={[
                styles.languageName,
                currentLanguage === language.code && styles.selectedLanguageName,
              ]}>
                {language.nativeName}
              </Text>
              <Text style={styles.languageEnglishName}>
                {language.name}
              </Text>
            </View>
            {currentLanguage === language.code && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{t('common.back')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
  },
  languageList: {
    marginBottom: 30,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedLanguageItem: {
    borderColor: '#202C5F',
    backgroundColor: '#F3F4F6',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  selectedLanguageName: {
    color: '#202C5F',
  },
  languageEnglishName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#202C5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#202C5F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LanguageScreen;
