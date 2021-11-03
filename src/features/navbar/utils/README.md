# utils

utility functions used only by the feature

# Code example : format.ts

``` typescript
import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');
```