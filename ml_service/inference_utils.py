# ml_service/inference_utils.py
import numpy as np
import librosa
from io import BytesIO

# TODO: set these to match training configuration
SAMPLE_RATE = 22050  # e.g. 16000 or 22050 or whatever you used
N_MFCC = 40          # same as in training
MAX_LEN = 173        # number of time frames expected by your CNN

def extract_mfcc_from_bytes(file_bytes: bytes):
    """
    Takes raw audio bytes, returns a numpy array shaped (1, n_mfcc, MAX_LEN, 1)
    ready for model.predict(...)
    """
    # Load audio from bytes
    audio_buf = BytesIO(file_bytes)
    y, sr = librosa.load(audio_buf, sr=SAMPLE_RATE)

    # Compute MFCCs with SAME params as training
    mfcc = librosa.feature.mfcc(
        y=y,
        sr=sr,
        n_mfcc=N_MFCC
        # TODO: if you used n_fft, hop_length etc. in training, add them here
        # n_fft=..., hop_length=...
    )

    # Pad / trim along time axis
    if mfcc.shape[1] < MAX_LEN:
        pad_width = MAX_LEN - mfcc.shape[1]
        mfcc = np.pad(mfcc, ((0, 0), (0, pad_width)), mode="constant")
    else:
        mfcc = mfcc[:, :MAX_LEN]

    # OPTIONAL: if you normalized MFCC in training, do it here too
    # e.g. mfcc = (mfcc - np.mean(mfcc)) / np.std(mfcc)

    # Shape to (1, H, W, 1) for CNN
    mfcc = mfcc[..., np.newaxis]         # (n_mfcc, MAX_LEN, 1)
    mfcc = np.expand_dims(mfcc, axis=0)  # (1, n_mfcc, MAX_LEN, 1)

    return mfcc
