import librosa

file_path = "../data/Respiratory_Sound_Database/Respiratory_Sound_Database/audio_and_txt_files/211_1p5_Ar_mc_AKGC417L.wav"

y, sr = librosa.load(file_path, sr=None)

print("Loaded length:", len(y))
print("Sample rate:", sr)
