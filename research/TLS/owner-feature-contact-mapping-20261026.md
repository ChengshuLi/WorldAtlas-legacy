# TLS owner-to-source-feature contact mapping (2026-10-26)

This is a source-free custody reconciliation of the frozen package `gb-TLS-ADM2--repair-evaluation` at accepted tree `f8c5ed05cedce1e3bc6db248407373381789c8df`. It maps each package owner index to the corresponding lineage location/source atom and reports the source-feature IDs recorded in that owner's extracted candidate intervals. It does not rerun geometry, qualify boundaries, or change disposition.

## Frozen package and operands

The pinned `source-package-queue.json` row binds 562 land cells, 337 interval segments, 22 owners, 31 source features, and native block 33. The package requires exact interval disposition with selected-native conservation and source/physical witness checks; this table is not itself a qualification result.

| Input | Git blob OID | Role |
|---|---|---|
| `coordination/engineering/global-current-cell-work-queue-20261014/source-package-queue.json` | `9c9a9bc83627afd3e8435ff4009e39530543bf54` | Frozen package row / input manifest |
| `.../source-feature-roster.json.gz` | `e6e380ec13cd4bcc1d24399a76bfa85ca5805b26` | Source feature IDs, names and family indices |
| `.../lineage.json.gz` | `4ef0728e74e11e069bd7bb11e287c6fbb59946fa` | Owner index to location, province and own source atom |
| `.../ownership-binding.json` | `b9d81d18aab6d03dc701ff1337b35e53be81d0af` | Selected-native ownership binding |
| `.../source-candidates-block-033.json.gz` | `192de4b75ca39bf07e4ead53647b39892a904642` | Compressed candidate intervals |
| `.../physical-support-block-033.json.gz` | `f489fb1c9f462c1bda2c1e0b2818114e51bcc061` | Compressed physical support intervals |
| `.../inland-water-support-block-033.json.gz` | `e2c7e753c35ab6f2a580612900d33c00acc1ed0e` | Compressed water support intervals |
| `.../source-raster-summary.json` | `e17b10b5643c1f6b0c492d02edc70a0d7afc5ee3` | Source family labels |
| `.../source-census-summary.json` | `fa1e4d101edb54b02bd1ff42a240f2f80ac65832` | Candidate interval pins |
| `.../physical-unassigned-summary.json` | `0c934cdaf4b007a741e66d4a080890154bdae53c` | Physical interval pins |
| `data/hierarchy.json` | `0ec8bae8e04140326d8b48f09a35ac66ae54deb0` | Province/parent-area labels |

The task worktree lacks the water-support file in its checkout/object pack; the exact pinned compressed bytes were present at `/tmp/tls-water-block-033.json.gz` (SHA-256 `bca97a3b465b9559f556a2c9d0948803092f275c7d2d1a0a65d4b9bc1fd72059`) and were supplied to the existing interval extractor. No geometry was read or recomputed. The extracted table conserved 562 cells / 337 intervals / 22 owner indices and the queue's 31-feature union.

## Per-owner mapping

“Own atom” is the exact source atom bound to that owner by the retained lineage record. “Other contacts” lists every distinct feature in that owner's extracted candidate rows except that exact own atom. These are source-feature interval contacts, not legal or geographic equivalence claims. All 22 exact own atoms occur in their respective extracted owner rows; there is no absent-own-atom discrepancy in this extraction. Foreign contact counts are retained rather than treated as errors or discarded.

| Owner index | Lineage location | Province / parent-area label | Keys / intervals | Own source feature (ID) | Own contact | Other contacted source features (ID) |
|---:|---|---|---:|---|---|---|
| 42171 | Atauro | Dili / Lesser Sunda Islands | 51 / 30 | Atauro (`gb:TLS:ADM2:22284137B11289182458696`) | yes | Dili (`gb:TLS:ADM1:58719522B43373882655947`) |
| 42172 | Fatumean | Cova Lima / Lesser Sunda Islands | 25 / 15 | Fatumean (`gb:TLS:ADM2:22284137B11881161065747`) | yes | East Nusa Tenggara (`gb:IDN:ADM1:65028918B90323071856071`); Cova Lima (`gb:TLS:ADM1:58719522B58123781478976`) |
| 42178 | Iliomar | Lautém / Lesser Sunda Islands | 18 / 8 | Iliomar (`gb:TLS:ADM2:22284137B19934279863207`) | yes | Lautém (`gb:TLS:ADM1:58719522B74673759114814`); Viqueque (`gb:TLS:ADM1:58719522B88874257219633`) |
| 42179 | Tutuala | Lautém / Lesser Sunda Islands | 92 / 64 | Tutuala (`gb:TLS:ADM2:22284137B2107732035789`) | yes | Lautém (`gb:TLS:ADM1:58719522B74673759114814`) |
| 42180 | Cristo Rei | Dili / Lesser Sunda Islands | 35 / 11 | Cristo Rei (`gb:TLS:ADM2:22284137B23086342577141`) | yes | Dili (`gb:TLS:ADM1:58719522B43373882655947`) |
| 42183 | Lospalos | Lautém / Lesser Sunda Islands | 52 / 34 | Lospalos (`gb:TLS:ADM2:22284137B26175223982630`) | yes | Lautém (`gb:TLS:ADM1:58719522B74673759114814`) |
| 42186 | Alas | Manufahi / Lesser Sunda Islands | 31 / 19 | Alas (`gb:TLS:ADM2:22284137B36199594403094`) | yes | Manufahi (`gb:TLS:ADM1:58719522B42816757733835`) |
| 42188 | Hatu-Udo | Ainaro / Lesser Sunda Islands | 12 / 2 | Hatu-Udo (`gb:TLS:ADM2:22284137B3809405900530`) | yes | Ainaro (`gb:TLS:ADM1:58719522B96669271034989`) |
| 42189 | Tilomar | Cova Lima / Lesser Sunda Islands | 26 / 22 | Tilomar (`gb:TLS:ADM2:22284137B39285760424005`) | yes | Cova Lima (`gb:TLS:ADM1:58719522B58123781478976`) |
| 42190 | Atabae | Bobonaro / Lesser Sunda Islands | 2 / 2 | Atabae (`gb:TLS:ADM2:22284137B39370724774054`) | yes | Bobonaro (`gb:TLS:ADM1:58719522B64128847782213`) |
| 42193 | Same | Manufahi / Lesser Sunda Islands | 4 / 3 | Same (`gb:TLS:ADM2:22284137B41872156490215`) | yes | Manufahi (`gb:TLS:ADM1:58719522B42816757733835`) |
| 42194 | Pante Macassar | Oecusse / Lesser Sunda Islands | 4 / 4 | Pante Macassar (`gb:TLS:ADM2:22284137B41915999739632`) | yes | East Nusa Tenggara (`gb:IDN:ADM1:65028918B90323071856071`) |
| 42195 | Uato-Lari | Viqueque / Lesser Sunda Islands | 25 / 24 | Uato-Lari (`gb:TLS:ADM2:22284137B41938791268987`) | yes | Viqueque (`gb:TLS:ADM1:58719522B88874257219633`) |
| 42203 | Fatuberliu | Manufahi / Lesser Sunda Islands | 16 / 15 | Fatuberliu (`gb:TLS:ADM2:22284137B51170089916625`) | yes | Manufahi (`gb:TLS:ADM1:58719522B42816757733835`) |
| 42204 | Uatucarbau | Viqueque / Lesser Sunda Islands | 4 / 1 | Uatucarbau (`gb:TLS:ADM2:22284137B52677210689185`) | yes | Viqueque (`gb:TLS:ADM1:58719522B88874257219633`) |
| 42208 | Oesilo | Oecusse / Lesser Sunda Islands | 1 / 1 | Oesilo (`gb:TLS:ADM2:22284137B5780280326887`) | yes | Oecusse (`gb:TLS:ADM1:58719522B69518090574338`) |
| 42210 | Suai | Cova Lima / Lesser Sunda Islands | 21 / 18 | Suai (`gb:TLS:ADM2:22284137B60263836524270`) | yes | Cova Lima (`gb:TLS:ADM1:58719522B58123781478976`) |
| 42215 | Balibo | Bobonaro / Lesser Sunda Islands | 2 / 2 | Balibo (`gb:TLS:ADM2:22284137B63057021325797`) | yes | Bobonaro (`gb:TLS:ADM1:58719522B64128847782213`) |
| 42217 | Maliana | Bobonaro / Lesser Sunda Islands | 2 / 2 | Maliana (`gb:TLS:ADM2:22284137B67837040381832`) | yes | East Nusa Tenggara (`gb:IDN:ADM1:65028918B90323071856071`) |
| 42226 | Passabe | Oecusse / Lesser Sunda Islands | 20 / 15 | Passabe (`gb:TLS:ADM2:22284137B78589082369873`) | yes | East Nusa Tenggara (`gb:IDN:ADM1:65028918B90323071856071`); Oecusse (`gb:TLS:ADM1:58719522B69518090574338`) |
| 42230 | Viqueque | Viqueque / Lesser Sunda Islands | 71 / 25 | Viqueque (`gb:TLS:ADM2:22284137B80785204174249`) | yes | Viqueque ADM1 (`gb:TLS:ADM1:58719522B88874257219633`) |
| 42234 | Nitibe | Oecusse / Lesser Sunda Islands | 48 / 20 | Nitibe (`gb:TLS:ADM2:22284137B96760248350473`) | yes | East Nusa Tenggara (`gb:IDN:ADM1:65028918B90323071856071`); Oecusse (`gb:TLS:ADM1:58719522B69518090574338`) |

**Totals:** 562 keys, 337 intervals, 22 owner indices. Each owner has one exact own ADM2 source atom, present in its interval contact set. The queue's 31-feature union also includes features not shown in this owner-by-owner table where they were not contacted by these 22 owners; this table does not collapse the full competitor union or imply qualification.
