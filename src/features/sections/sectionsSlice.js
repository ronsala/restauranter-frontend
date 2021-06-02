import { 
  createAsyncThunk, 
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchSections = createAsyncThunk(
  'sections/fetchSections', 
  async ({restaurantId, menuId}) => {
    // debugger
    const sections = await fetch(`http://localhost:3000/api/v1/restaurants/${restaurantId}/menus/${menuId}/sections`)
    .then((res) => res.json());
    return sections
  }
)

const sectionsAdapter = createEntityAdapter({
  selectId: (section) => section.id
})

export const sectionsSlice = createSlice({
  name: 'section',
  initialState: sectionsAdapter.getInitialState({
    status: 'idle'
  }),
  reducers: {
    addOneSection: sectionsAdapter.addOne
  },
  extraReducers: {
    [fetchSections.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchSections.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      sectionsAdapter.setAll(state, action.payload.data)
    },
    [fetchSections.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const {
  selectById: selectSectionById,
  selectIds: selectSectionIds,
  selectEntities: selectSectionEntities,
  selectAll: selectAllSections,
  selectTotal: selectTotalSections,
} = sectionsAdapter.getSelectors((state) => state.sections)

export default sectionsSlice.reducer;